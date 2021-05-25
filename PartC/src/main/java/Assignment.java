import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Assignment {
    private static Scanner scan;

    public static void main(String[] args) {
        scan = new Scanner(System.in);
        Assignment ass = new Assignment();
        AmazonS3 s3_client = ass.createS3client();

        System.out.println("1. Add userID and Password to Database");
        System.out.println("2. Retrieve password from UserID");

        int scase = Integer.parseInt(scan.nextLine());

        switch (scase){
            case 1:
                ass.add_to_db(s3_client);
                break;

            case 2:
                ass.password_retriever(s3_client);
                break;

            default:System.out.println("Invalid Choice Entered");
                break;
        }
    }

    public AmazonS3 createS3client(){
        /*
            Document Referred
            https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/client/builder/AwsClientBuilder.html
            https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/examples-s3-buckets.html

         */
        String accesskey = "ASIA3TAPEDRZK6BP3U4F";
        String secretkey = "0n14KOO76FGXSTi4oK7iXy2+kJIOfQA4SEOpJPL6";
        String sessiontoken ="IQoJb3JpZ2luX2VjEPP//////////wEaCXVzLXdlc3QtMiJHMEUCIQCJBxC3wh2vzO3ijSZq22JIdMRC3n2TB7woCgqgAJPvzwIgZRZk/LCEA465ZUK1/5lKmqIPCl9/ep6/jqmegbX1fFQqsQIIjP//////////ARAAGgw3OTY3NDgxNjAxMTQiDOBLyFYtu7AlXQGcGCqFAuAKdl46a/Y8+rvhFk+v7T/H12R6AlTb3knPsK4+Abe2/27katzg7dM4uJMn89ElleouVyTC9RiVuJpE19iVqOztgrXDKXNWjweszcVewv28boxkp7KiIHDKrOeXPNhrxUAzX9ejywJ63hDVcuAdKRwbkTAomQbzPoc8dy/UdikbwtbBeY0x/QOHVqDg7lqTgBeVhi6nkXsjqFE0d6Lem1rnZiO8SylfKA4lUl75YnCEK8EwqxXbVwvMNwOsBhoV+orc7X4o6gP6NWbacu6hTd5yE16fAm8dIw3Fo7+kQp1bUi2Ckxj+ZKF4YBHPyVJf4sxn81VzivUMzA0m6I+2E8YbljJCKzCb+ZiFBjqdAZ++Tj2DoZpmFtCoQJOxDWl2xc2bdszu8r4zJkvUeTBS4poiYVMkbrTJNuufX2IfcEAnNdVo063qha6Zp+WYnWHXnoSL2UaXZnPfq8LnMHvPgGsW4S6bt3H+zMz7M7sfc7AVeSwdhPCKUlZvXblnBVe4Llb5zn3u45h7RuSBdN3e8oTZl7zq0zSnkd6C+1pvQhUsZP4s8vct5OEF3X4=";
        Regions region = Regions.US_EAST_1;

        BasicSessionCredentials awsCreds = new BasicSessionCredentials(accesskey,secretkey,sessiontoken);

        AmazonS3 s3_client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .withRegion(region)
                .build();
        return s3_client;
    }

    private void add_to_db(AmazonS3 s3_client) {
        System.out.println("Enter User Id (converted to lower case)");
        String userID = scan.nextLine().toLowerCase();
        System.out.println("Enter Password (converted to lower case)");
        String before_enc_pass = scan.nextLine().toLowerCase();
        String enc_pass = encryptor(before_enc_pass, s3_client);
        String url = "jdbc:mysql://database-1.cjw8moe24ubd.us-east-1.rds.amazonaws.com";
        String userName = "master";
        String dbName = "/assignment1";
        String driver = "com.mysql.jdbc.Driver";
        Connection conn = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            String query = "INSERT INTO `database` (userID, Password) VALUES (?,?)";
            conn = DriverManager.getConnection(url + dbName, userName, "password");
            PreparedStatement preparedStmt = conn.prepareStatement(query);
            preparedStmt.setString (1, userID);
            preparedStmt.setString (2, enc_pass);
            preparedStmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("Added Successfully");
        System.out.println("UserID: " + userID);
        System.out.println("Password(User Entered): " + before_enc_pass);
        System.out.println("Password(Encrypted): " + enc_pass);
    }

    private String encryptor( String password, AmazonS3 s3_client) {
        /*
            https://docs.aws.amazon.com/AmazonS3/latest/userguide/download-objects.html
         */
        S3Object fullObject = null;
        fullObject = s3_client.getObject(new GetObjectRequest("ass1partc", "Lookup5410.txt"));
        InputStreamReader objectData =new InputStreamReader(fullObject.getObjectContent(), StandardCharsets.UTF_8);
        List<String> doc = new BufferedReader(new InputStreamReader(fullObject.getObjectContent(),
                StandardCharsets.UTF_8)).lines().collect(Collectors.toList());
        HashMap<String,String> decode_map=new HashMap<String,String>();
        for (int k = 1; k<doc.size(); k++ ){
            String str = doc.get(k);
            String[] arr_str = str.split("\t");
            decode_map.put(arr_str[0], arr_str[1]);
        }
        char[] ch = new char [password.length()];
        String tmp = "";
        String encrypted_password = "";
        for (int i = 0; i < password.length(); i++) {
            ch[i] = password.charAt(i);
            tmp = String.valueOf(ch[i]);
            encrypted_password = encrypted_password + (decode_map.get(tmp));
        }
        return encrypted_password;
    }

    private void password_retriever(AmazonS3 s3_client) {
        System.out.println("Enter User Id (converted to lower case)");
        String userID = scan.nextLine().toLowerCase();
        String url = "jdbc:mysql://database-1.cjw8moe24ubd.us-east-1.rds.amazonaws.com";
        String userName = "master";
        String dbName = "/assignment1";
        String driver = "com.mysql.jdbc.Driver";
        Connection conn = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(url + dbName, userName, "password");
            PreparedStatement statement = conn.prepareStatement("select Password from `database` where userID = ?");
            statement.setString(1, userID);
            ResultSet rs = statement.executeQuery();
            System.out.println("UserID: " + userID);
            while(rs.next()){
                String fetched_pass = rs.getString("Password");
                System.out.println("Encrypted Password: "+ fetched_pass);
                String decrypted_pass = decryptor(fetched_pass, s3_client);
                System.out.println("Decrypted Password: "+ decrypted_pass);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String decryptor(String password, AmazonS3 s3_client) {
        /*
            https://docs.aws.amazon.com/AmazonS3/latest/userguide/download-objects.html
         */
        password = password.toLowerCase();
        S3Object fullObject = null;
        fullObject = s3_client.getObject(new GetObjectRequest("ass1partc", "Lookup5410.txt"));
        InputStreamReader objectData =new InputStreamReader(fullObject.getObjectContent(), StandardCharsets.UTF_8);
        List<String> doc = new BufferedReader(new InputStreamReader(fullObject.getObjectContent(),
                StandardCharsets.UTF_8)).lines().collect(Collectors.toList());
        HashMap<String,String> decode_map=new HashMap<String,String>();
        for (int k = 1; k<doc.size(); k++ ){
            String str = doc.get(k);
            String[] arr_str = str.split("\t");
            decode_map.put(arr_str[1], arr_str[0]);
        }
        int a = Math.round(password.length()/2);
        char[] chr = new char [password.length()];
        String[] str = new String[a];
        String decrypted_password = "";
        for (int i = 0; i < password.length(); i++) {
            chr[i] = password.charAt(i);
            String tmp = String.valueOf(chr[i]);
            i = i + 1;
            chr[i] = password.charAt(i);
            String tmp1 = String.valueOf(chr[i]);
            String tmp2 = tmp + tmp1;
            decrypted_password = decrypted_password + (decode_map.get(tmp2));

        }
        return decrypted_password;
    }

}

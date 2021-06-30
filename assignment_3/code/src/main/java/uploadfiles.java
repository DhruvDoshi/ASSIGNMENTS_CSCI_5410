import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;

import java.io.File;
import java.util.Scanner;

public class uploadfiles {
    private static Scanner scan;
    public static void main(String[] args){
        scan = new Scanner(System.in);

        uploadfiles up = new uploadfiles();
        AmazonS3 s3 = up.createS3client();

        System.out.println("Enter the Bucket Name:");
        String bucket_name = scan.nextLine();
        up.upload_file(s3, bucket_name);

        }
    public AmazonS3 createS3client(){
        /*
            For the development of this method I have referred
            https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/examples-s3-buckets.html
         */
        String accesskey = "ASIA3TAPEDRZIO4SGT4X";
        String secretkey = "cTM3r43X9aZNvKgZklgSqXQCL4lwZRjjuTZ0IV9s";
        String sessiontoken = "FwoGZXIvYXdzEOT//////////wEaDObQhuWDrm8Mklx/NCK/Af4n2A1wkF44BES8xIZ2KHXkd12bmQ7UE8sJwh72qxlzCb1Otghjvt1nD5Kdp6XUwusrNz6IHa5Optom85+VBIJIOa+Vn+z6tSSOZ5pRDWt9sxBqrg2+kKNYoFNkO0/KHYSsqiXtSK+re7ah1nWRkhoiGIiW2mfybHrlvxTncZpssiym+GzeJavzqp0234MuoZooTWqlqJsGaCIrSG/JilCmPvJeCBImBUmV/6EvuyNIV+XQ3ZUeCWKSL13ODvatKMX+8oYGMi3q2sUh68VkvTdtCOuvpqJXYM7BpvE0QNVen7V950i+rBlIxb09vq/vu2ifd+4=";
        Regions region = Regions.US_EAST_1;

        BasicSessionCredentials awsCreds = new BasicSessionCredentials(accesskey,secretkey,sessiontoken);

        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .withRegion(region)
                .build();
        return s3Client;
    }
    public void upload_file(AmazonS3 s3Client, String bucket_Name) {
        /*
            For development of this method I have referred
            https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
         */
        //Change the Bucket name, File Name and File path from here.
        String file_Name = "";
        String file_Path = "";
        for (int i =1; i<402; i++) {
            if (i<10) {
                file_Name = "00"+i;
                file_Path = "src/main/resources/tech/00"+i+".txt";
            }
            else if (i>9 && i<100){
                file_Name = "0"+i;
                file_Path = "src/main/resources/tech/0"+i+".txt";
            }
            else if(i>99){
                file_Name = "0"+i;
                file_Path = "src/main/resources/tech/"+i+".txt";
            }
            if (s3Client.doesBucketExistV2(bucket_Name)) {
                try {
                    PutObjectRequest request = new PutObjectRequest(bucket_Name, file_Name, new File(file_Path));
                    s3Client.putObject(request);
                    System.out.println("File named " + file_Name + " Uploaded Successfully");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                try {
                    create_bucket(s3Client, bucket_Name);
                    PutObjectRequest request = new PutObjectRequest(bucket_Name, file_Name, new File(file_Path));
                    s3Client.putObject(request);
                    System.out.println("File named " + file_Name + " Uploaded Successfully");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
    public void create_bucket(AmazonS3 s3Client, String bucket_name){
        /*
            For development of this method I have referred
            https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html
         */
        if (s3Client.doesBucketExistV2(bucket_name)) {
            System.out.println("Bucket Name already Exists "+bucket_name);
        } else {
            try {
                s3Client.createBucket(bucket_name);
                System.out.println("Bucket named " + bucket_name + " Created Successfully");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
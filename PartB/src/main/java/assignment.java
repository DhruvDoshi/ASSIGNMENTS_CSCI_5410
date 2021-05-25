import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;

import java.io.File;
import java.util.Scanner;

public class assignment {
    private static Scanner scan;
    public static void main(String[] args){
        scan = new Scanner(System.in);

        assignment ass = new assignment();
        AmazonS3 s3 = ass.createS3client();

        System.out.println("1.Upload the file to the bucket.");
        System.out.println("2.Create a new bucket.");
        System.out.println("3.Change the permission for the bucket.");
        System.out.println("4.Transfer the file from one bucket to another");
        System.out.println("Please Enter the Choice");

        int scase = Integer.parseInt(scan.nextLine());
        switch (scase){
            case 1:
                System.out.println("Enter the Bucket Name:");
                String bucket_name = scan.nextLine();
                ass.upload_file(s3, bucket_name);
                break;
            case 2:
                System.out.println("Enter the Bucket Name:");
                String bucket_name1 = scan.nextLine();
                ass.create_bucket(s3, bucket_name1);
                break;
            case 3:
                ass.change_permission(s3);
                break;
            case 4:
                ass.transfer_file(s3);
                break;
            default:System.out.println("Invalid Choice Entered");
                break;
        }
    }

    public AmazonS3 createS3client(){
        /*
            For the development of this method I have referred
            https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/examples-s3-buckets.html
         */
        String accesskey = "ASIA3TAPEDRZDSHHQKTC";
        String secretkey = "Oz9cPiEF15KVE74F13YN16WOT3v7D9NzqQwBsWA5";
        String sessiontoken = "IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJIMEYCIQDqwT4G8oXEEIvG//8s9avOVUR353JyMtQnG6cQzjfqMQIhAMzmLM59S44nAqTkW3kB4dr6OoUQSj97+A3DwObK5OMFKrECCP3//////////wEQABoMNzk2NzQ4MTYwMTE0IgzcleEYtB8Y7j557rQqhQKr3B+Kjv/SsnCDRQqgUJxmsWLFzCY85em4tx59U7sPtMiEYEVr2Vsmo5azsbDRFSdhR3u/6+lkv4Waf2NYXePg/LRGvjrOYHjnqiEftUrZTLGhj3FERToF5R/GCxFJaCfvPdwtgZdOdwGz9T3uqcXzw8Dd7QgojwH3YsF4Lur4ufLygCt8YyGOvQguzLBDzbhaD7UZrY7x2/P1DzXKHM2MqETy1UHKeNr9u29It+GUb+Y5wE1sc9eLkTShjivspOnbhOtT9gkONcJrNRTrFdUWRyOmfkqy9nBvJEbwcoV86PG2AUJ2X5Jjyxv2E92zEfaImJNwSyDTINiZCiFEprquxv+DiKow2N6xhQY6nAFhE2F0axaYrUtV8/zWf9xjlgFeE7jaIswcGLPbz5nHk4v1rj4ZbFU+x2AJ1z4oYxz6DtsSJ79wiPABXN1xjSi7Tb2hoPocQHK6jX4+oBO6KpVTAJGTvNAGX8fUE+k4FkkQZlQc/0Mw0PoCCjHfq787psqER6Llea1dVXrQ0Ar48PznE1foQWKEsWoutaa2gvdzgFYuhCChBpb1t/A=";
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
        String file_Name = "Dhruv";
        String file_Path = "src/main/resources/Dhruv.txt";
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

    public void change_permission(AmazonS3 s3Client) {
        /*
            For development of this method I have referred
            https://docs.aws.amazon.com/AmazonS3/latest/userguide/configuring-block-public-access-bucket.html
         */
        System.out.println("Enter the Bucket Name");
        String bucket_name = scan.nextLine();
        if (s3Client.doesBucketExistV2(bucket_name)) {
            s3Client.setPublicAccessBlock(new SetPublicAccessBlockRequest()
                    .withBucketName(bucket_name)
                    .withPublicAccessBlockConfiguration(new PublicAccessBlockConfiguration()
                            .withBlockPublicAcls(true)
                            .withIgnorePublicAcls(true)
                            .withBlockPublicPolicy(true)
                            .withRestrictPublicBuckets(true)));
        /*
            For development of this method I have referred
            https://github.com/awsdocs/aws-doc-sdk-examples/blob/master/java/example_code/s3/src/main/java/aws/example/s3/ModifyACLExistingObject.java
         */
        AccessControlList acl = s3Client.getBucketAcl(bucket_name);
        acl.getGrantsAsList().clear();
        acl.grantPermission(new CanonicalGrantee(acl.getOwner().getId()), Permission.Write.FullControl);
        s3Client.setBucketAcl(bucket_name, acl);

        }
        else {
            System.out.println("To Create Bucket named " + bucket_name + " press 1");
            int i = Integer.parseInt(scan.nextLine());
            if (i == 1){
                if (!s3Client.doesBucketExistV2(bucket_name)) {
                    s3Client.createBucket(bucket_name);
                    if (s3Client.doesBucketExistV2(bucket_name)) {
                        s3Client.setPublicAccessBlock(new SetPublicAccessBlockRequest()
                                .withBucketName(bucket_name)
                                .withPublicAccessBlockConfiguration(new PublicAccessBlockConfiguration()
                                        .withBlockPublicAcls(true)
                                        .withIgnorePublicAcls(true)
                                        .withBlockPublicPolicy(true)
                                        .withRestrictPublicBuckets(true)));
                    }
                }
            }
        }
    }

    public void transfer_file(AmazonS3 s3Client){
        System.out.println("Enter name of sending bucket");
        String from_bucket = scan.nextLine();
        System.out.println("Enter name of receiving bucket");
        String to_bucket = scan.nextLine();
        if (!s3Client.doesBucketExistV2(to_bucket)) {
            s3Client.createBucket(to_bucket);
        }
        System.out.println("Enter the name of file intended to move from sending bucket");
        String object_key = scan.nextLine();
        s3Client.copyObject(from_bucket, object_key, to_bucket, object_key);
        s3Client.deleteObject(from_bucket, object_key);
        System.out.println("Moved file " + object_key);
    }
}
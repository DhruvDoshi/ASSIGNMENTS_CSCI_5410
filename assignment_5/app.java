import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSClient;
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
import com.amazonaws.services.sqs.model.AmazonSQSException;
import com.amazonaws.services.sqs.model.CreateQueueRequest;
import com.amazonaws.services.sqs.model.CreateQueueResult;

import com.amazonaws.services.sqs.model.SendMessageRequest;
import java.util.ArrayList;

public class app {
    public static void main(String[] args) {
        String ACCESS_KEY="ASIA3TAPEDRZAPNXAP7N";
        String SECRET_KEY="yjR14wRL8/Z79ak8MPm+EirgyXYZJhSZsIrZ9HYI";
        String ACCESS_TOKEN="FwoGZXIvYXdzELv//////////wEaDGnBYbIhkPx8fo63HiK/AUwCBM1jSY7H31GWy0TVm4u9w35BUHsXHh0ouViM4WL3CBMIWMYa3tkXMmJjHYBij9v2AD1WPzf47Fq8Qyv/6eIN6BppzCxigva2j5erKZ5DrPcvEhLb1NfciwqKSbfLv0yhY6HNqfcJatB2Th9EDgAEPGHOZHhrfbXJsT8WaVtZx0w5I9BIAZxA36Gtktu9gGfQ8M8i7xqLcoxQTli5Hk0gGA8YLOkXi4IIlYjDCw/KpEmHjpWDkaOyuTAx+3BwKPnQkogGMi2+XSFnSGKbWzPsgP+cw6v3Ts2TM3pNvBKE8LnSB8zLv31/N2YXrmJKCRgCt9Y=";
        
        // TODO Auto-generated method stub
        String QUEUE_NAME="serverless_ass_5";
        AWSCredentials credentials = new BasicSessionCredentials(ACCESS_KEY,SECRET_KEY,ACCESS_TOKEN);
        AmazonSQS sqs = AmazonSQSClientBuilder.standard().withRegion(Regions.US_EAST_1).build();
        String queueUrl = sqs.getQueueUrl(QUEUE_NAME).getQueueUrl();
        ArrayList<Integer> message =new ArrayList<>();
        ArrayList<String> addressStirng =new ArrayList<>();
        message.add(2);
        addressStirng.add("Anandnagar road");
        message.add(1);
        addressStirng.add("Prahladnagar road");
        message.add(3);
        addressStirng.add("Herring Cove road");
        message.add(4);
        addressStirng.add("Bently nagar");
        message.add(5);
        addressStirng.add("Dalhousie Lane");
        ms.add(6);
        addressStirng.add("Park Avenye");
        
        for(int i=0;i<message.size();i++){
            System.out.println(Integer.toString(i));
            SendMessageRequest message_request = new SendMessageRequest().withQueueUrl(queueUrl).withMessageBody(addressStirng.get(i)+Integer.toString(message.get(i))).withDelaySeconds(5);
            sqs.sendMessage(message_request);
        }
    }
}
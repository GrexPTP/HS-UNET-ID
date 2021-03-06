<?php



namespace App;
use Google\Cloud\Storage\StorageClient;
class Helper {
    private $privateKeyFileContent = '
    {
        "type": "service_account",
        "project_id": "inner-rhythm-306513",
        "private_key_id": "28844f7fbc0002e6aee4b7dfbb56b97ec30e2186",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCb21aWlrxm9iVJ\nnLrlKlAUNmvGAFw6kvdWQ7/IyooqVL0SxLVuTuzMGIq4L2r3jL65czaIIDIHxfK2\n3dO4E98xC10VvIffGBfyHmuEl0HZaaTeq9vtffJQFh0o5iXwYKYHkUJCFARV+Ifi\n+mq4QeDkt7L/Dl2+/oGD0yXfe4hKd1TOEBr1wveAvQM1knZB91jWxSkYW5Xak+MC\nPPeaJNRTsCHBpzwMIEakOVicLo9FzgARY1hnS/7YdeJvro8/A5eT8xFGV3h7onBi\nokx1mygIIANTqJdTQYAOcOF0CsXY5OUuUXbKOSAF29iAncKutx5Thnh4oSeQhPoK\nb9eshmQ/AgMBAAECggEACU6QPZ7TskxJjrtCt9OOg556UhEMcNz80xRpm+poVL3J\nqpi/gs5IuqlOg1AlkZHAg9965qcRhcBOzZeygGADaHDWxqkC7hIIwAcMAZdssbhq\nxXc6w1RNh3XCmQIhStjioToN3FdIqP+V0bqFa+pXLSFBGZT4iSK2hjIyJUXBrjyZ\nHPcJuITHt+FUFOwRu6f812dWUQh+Z2A72yCMXYR9yyq/83zaRyL7zdSMP7rlV7FU\nRngFLlKiHsr0dKTq4pzAOWZF4ihEi94U5EN4Y+C31LYWqOoL/ipCJd1eAuZ2Xf07\nRuRRTVaimdbxnz7ZPtPp7Eb9vq5wRTI0NPCa86KOoQKBgQDQ9wHWWfw0rIVxZ3Ka\nTVWSmrJdJppLdYg9LCDg8imqLb4cSkZUNbwTI3uy+HbUugjY6hA86gGKvWwNPZ38\n/Egthht6Y3H761BC6h3J2A2sMomJ/HcR4+rJYd/KlSKyU747J1eD3Spj7noTt0Dy\n3URCLPsSG1EoVJJ8F9149U7jXwKBgQC+8CHhVpFVpDt/NgaQ+ckF9KEGulQeJneq\nMg5id6YrtTNUgRr+JQCtQGpNvKGUw2TdYRD/AvpKq5mIS1K0HFuG9R2Y4tI1aqJC\nxfo/FbZSTPmFJdMZ8ePK2LAanVSEIm8X6mqtpEm1v23XFxwVq13xj7Q/9HDe+dj0\nNS0VJCoLIQKBgBGjiAgr+FoJ5gm4jbfwpzSE0mGCjKup9CIVw4C5cELpMY75xg39\nqy6CZEKrLnyuZ2jH+S7rIc4wRxqnBNsCAKW3GEKwekKljlTXpkQPdLgAXBPFt9dO\nwdbV6CoVhKRA5WHg5EZBOP7OdoeLhHP7sXNUkKzqmWMqIGNRMGSxcENJAoGBAKLS\nxiGSH+enYLFPkfPpflqczQCevoLjjOJPQ2MG42acZARpAGq/hT85Ei3ucOAabBY4\n4zSEBorMoOXQTduX3xlMR4wLyPSSVYKZr5hCXLL8P0AjDE0wsG9Xr31SszLm5lO/\nrG8dDVp2vyVP6Lw14avQPwbW3bXX3AIMosBHka7hAoGBAJwk/80SwDM+QrcHHvpv\nkfJMgJOn0CnGRcAKFdRRGW5OC0ScjA/66OzF0+C6w5Z2/lgPSdhE2mfLUimrlP+T\ngWkWbSUTdqrhatlpxqZYyouxPQSHftDUXQT6o4ns872gYNr9z4WuEPtbeL13TbXa\nkCKTdi+jU0xN2LWdTImht04Y\n-----END PRIVATE KEY-----\n",
        "client_email": "hunet-image@inner-rhythm-306513.iam.gserviceaccount.com",
        "client_id": "103839655427413602055",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/hunet-image%40inner-rhythm-306513.iam.gserviceaccount.com"
      }
      
    ';
    /*
     * @params $bucketName Name of the bucket
     * @params $fileContent the image not url 
     * @params $cloudPath the expected url
     */
    function uploadFile($bucketName, $fileContent, $cloudPath) {
        $privateKeyFileContent = $this->privateKeyFileContent;
        // connect to Google Cloud Storage using private key as authentication
        try {
            $storage = new StorageClient([
                'keyFile' => json_decode($privateKeyFileContent, true)
            ]);
        } catch (Exception $e) {
            // maybe invalid private key ?
            print $e;
            return false;
        }
     
        // set which bucket to work in
        $bucket = $storage->bucket($bucketName);
     
        // upload/replace file 
        $storageObject = $bucket->upload(
                $fileContent,
                ['name' => $cloudPath]
                // if $cloudPath is existed then will be overwrite without confirmation
                // NOTE: 
                // a. do not put prefix '/', '/' is a separate folder name  !!
                // b. private key MUST have 'storage.objects.delete' permission if want to replace file !
        );
     
        // is it succeed ?
        return 'https://storage.googleapis.com/'.$bucketName.'/'.$cloudPath;
    }
}

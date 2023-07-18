terraform {

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
}


provider "aws" {
  profile = "default"
  region  = "us-west-2"
  access_key = "my-access-key"
  secret_key = "my-secret-key"

}

resource "aws_s3_bucket" "my_bucket" {
  bucket = "my-tf-test-bucket"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}


resource "aws_s3_bucket_object" "object" {
  bucket = aws_s3_bucket.my_bucket.id
  key    = "new_object_key"
  source = "/tmp/aa"
  server_side_encryption = "aws:kms"

  # The filemd5() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the md5() function and the file() function:
  # etag = "${md5(file("/tmp/aa"))}"
  etag = filemd5("/tmp/aa")
}
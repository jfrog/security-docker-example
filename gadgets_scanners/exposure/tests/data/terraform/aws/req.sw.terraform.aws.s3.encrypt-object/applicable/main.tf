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

resource "aws_s3_bucket" "mybucket" {
  bucket = "mybucket"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}


resource "aws_s3_bucket_object" "object" {
  bucket = aws_s3_bucket.mybucket.id
  key    = "new_object_key"
  source = "/tmp/aa"

  etag = filemd5("/tmp/aa")
}
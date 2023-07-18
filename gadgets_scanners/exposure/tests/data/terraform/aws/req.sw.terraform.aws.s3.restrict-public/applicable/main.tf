terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  profile    = "default"
  region     = "us-west-2"
  access_key = "my-access-key"
  secret_key = "my-secret-key"

}

resource "aws_s3_bucket" "example" {
    bucket = "bucket"
}

resource "aws_s3_bucket_public_access_block" "bad_example" {
   bucket = aws_s3_bucket.example.id

   restrict_public_buckets = false
}


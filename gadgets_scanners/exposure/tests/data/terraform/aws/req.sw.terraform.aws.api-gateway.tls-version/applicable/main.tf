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


resource "aws_api_gateway_domain_name" "example" {
 # certificate_arn = aws_acm_certificate_validation.example.certificate_arn
  domain_name     = "api.example.com"
}
# AWS Minimal Infrastructure Blueprint (S3, EKS, Secrets Manager, CloudWatch)
provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  default = "us-east-1"
}

resource "aws_s3_bucket" "artifacts" {
  bucket        = "autoengineer-artifacts-prod-bucket"
  force_destroy = true
}

resource "aws_secretsmanager_secret" "jwt_secret" {
  name = "autoengineer/jwt-secret"
}

resource "aws_kms_key" "encryption_key" {
  description             = "KMS Key for AutoEngineer AI Secrets & Storage"
  deletion_window_in_days = 7
}

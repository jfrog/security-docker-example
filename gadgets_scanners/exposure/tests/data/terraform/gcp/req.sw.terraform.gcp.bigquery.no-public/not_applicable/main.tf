provider "google" {
  project = "iac-trials"
  region  = "us-central1"
  zone    = "us-central1-c"
}

resource "google_service_account" "default" {
  account_id   = "service-account-id"
  display_name = "Service Account"
}

resource "google_bigquery_dataset" "dataset" {
  dataset_id                  = "example_dataset"
  friendly_name               = "test"
  description                 = "This is a test description"
  location                    = "EU"
  default_table_expiration_ms = 3600000

  labels = {
    env = "default"
  }

  access {
    role          = "OWNER"
    user_by_email = google_service_account.bqowner.email
  }

  access {
    role   = "READER"
    domain = "hashicorp.com"
  }
}

resource "google_service_account" "bqowner" {
  account_id = "bqowner"
}
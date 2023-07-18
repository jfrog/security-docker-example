provider "google" {
  project = "iac-trials"
  region  = "us-central1"
  zone    = "us-central1-c"
}

resource "google_service_account" "default" {
  account_id   = "service-account-id"
  display_name = "Service Account"
}

resource "google_dns_managed_zone" "example-zone" {
  name        = "example-zone"
  dns_name    = "example-${random_id.rnd.hex}.com."
  description = "Example DNS zone"
  labels = {
    foo = "bar"
  }
  dnssec_config {
    default_key_specs {
      algorithm =  "rsasha1"
      key_length = 1024
    }
  }
}

resource "random_id" "rnd" {
  byte_length = 4
}
provider "google" {
  project = "iac-trials"
  region  = "us-central1"
  zone    = "us-central1-c"
}


resource "google_sql_database_instance" "main" {
  name             = "main-instance1"
  database_version = "POSTGRES_14"
  region           = "us-central1"

  settings {
    # Second-generation instance tiers are based on the machine
    # type. See argument reference below.
    tier = "db-f1-micro"
  }
}
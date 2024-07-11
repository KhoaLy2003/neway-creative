ALTER TABLE customer ADD COLUMN facebook_url VARCHAR(255);

ALTER TABLE customer MODIFY COLUMN `email_address` varchar(255) NULL;

ALTER TABLE customer MODIFY COLUMN `password` varchar(255) NULL;
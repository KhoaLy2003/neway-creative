CREATE TABLE IF NOT EXISTS calendar_image
(
    calendar_image_id INT AUTO_INCREMENT PRIMARY KEY,
    image_url         VARCHAR(255) NOT NULL,
    calendar_id       INT          NOT NULL,
    CONSTRAINT fk_calendar FOREIGN KEY (calendar_id) REFERENCES calendar (calendar_id)
);

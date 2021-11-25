INSERT INTO users (name, email, password) 
VALUES ('john', 'john@test.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('james', 'james@test.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('jane', 'jane@test.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('bob', 'bob@test.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('mark', 'mark@test.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('peter', 'peter@test.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties
(title, description, thumbnail_photo_url, cover_photo_url, cost_per_night,parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active, owner_id)
VALUES ('Speed lamp', 'description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',930,6,4,8, 'CANDA', '536 Namsub Highway','Sotboske', 'Quebec', '28142', true, 2),
('Blank corner ', 'description','https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',330,2,2,3, 'CANDA', '651 Nami Road ', 'Bohbatev','Alberta' ,'44583 ', true, 4 ),
 ('Habit mix', 'description','https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',390,2,2,4, 'CANDA', '513 Powov Grove ', 'Jaebvap','Ontario', '38051', true, 3 ),
 ('Headed know ', 'description','https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg',1100,6,6,9, 'CANDA', '1392 Gaza Junction', 'Upetafpuv','Nova Scotia', '81059', true, 1),
 ('Port out', 'description','https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg',400,3,4,4, 'CANDA', '169 Nuwug Circle','Vutgapha', 'Newfoundland And Labrador', '00159', true, 2);


INSERT INTO reservations (start_date, end_date, guest_id, property_id)
VALUES ('2018-09-11','2018-09-17', 1, 1),
 ('2019-01-01', '2019-01-12', 2, 2),
 ('2020-03-12', '2020-03-18', 5, 4),
 ('2020-11-11', '2020-11-13', 3, 3);

INSERT INTO property_reviews (rating, message, guest_id, property_id, reservation_id)
VALUES (3, 'message1', 1, 1, 9),
 (4, 'message2', 2, 2, 10),
 (2, 'message3', 5, 4, 11),
 (5, 'message4', 3, 3, 12);


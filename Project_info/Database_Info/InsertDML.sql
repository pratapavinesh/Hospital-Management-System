INSERT INTO Patient_Information_Table VALUES
('ritik@gmail.com','ritik','ritik08', 'male','Tamil Nadu'),
('rashi@gmail.com','rashi','rashikr08', 'male','Karnataka'),
('avinesh@gmail.com','avinesh','avinesh10','male','Gujarat')
;

INSERT INTO Medical_History_of_Patient VALUES
(1,'19-01-14','Pain in abdomen','Heart Surgery','Crocin'),
(2,'19-01-14','Frequent Indigestion','none','none'),
(3,'19-01-14','Body Pain','none','Iodex')
;

INSERT INTO Doctor_Information_Table VALUES
('sundramc@gmail.com', 'Sundram','male', 'kjsbdvjhbds'),
('shravanpanday@gmail.com', 'Shravan','male', 'akjbhjvbskjbse')
;

INSERT INTO Appointment_Information_Table VALUES
(1, '19-01-15', '09:00', '10:00', 'Done'),
(2, '19-01-16', '10:00', '11:00', 'Done'),
(3, '19-01-18', '14:00', '15:00', 'Done')
;

INSERT INTO Patient_Attend_Appointments_Information_Table VALUES
(1,'ritik@gmail.com', 'none', 'itchy throat'),
(2,'rashi@gmail.com', 'infection', 'fever'),
(3,'avinesh@gmail.com','nausea', 'fever')
;

INSERT INTO Schedule_Information_Table VALUES
(001,'09:00','17:00','12:00','Tuesday'),
(001,'09:00','17:00','12:00','Friday'),
(001,'09:00','17:00','12:00','Saturday'),
(001,'09:00','17:00','12:00','Sunday'),
(002,'09:00','17:00','12:00','Wednesday'),
(002,'09:00','17:00','12:00','Friday')
;

INSERT INTO Patients_Fill_History_Information_Table VALUES
('ritik@gmail.com', 1),
('rashi@gmail.com', 2),
('avinesh@gmail.com', 3)
;

INSERT INTO Diagnose_Information_Table VALUES
(1,'sundramc@gmail.com', 'Bloating', 'Ibuprofen as needed'),
(2,'shravanpanday@gmail.com', 'Muscle soreness', 'Stretch morning/night'),
(3,'shravanpanday@gmail.com', 'Vitamin Deficiency', 'Good Diet')
;

INSERT INTO Doctors_Have_Schedules_Information_Table VALUES
(001,'sundramc@gmail.com'),
(002,'shravanpanday@gmail.com')
;

INSERT INTO Doctor_Views_History_Information_Table VALUES
('sundramc@gmail.com',1),
('shravanpanday@gmail.com',2),
('shravanpanday@gmail.com',3)
;

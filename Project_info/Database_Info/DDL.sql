drop DATABASE if exists HospitalManagementSystem;
CREATE DATABASE HospitalManagementSystem;
USE HospitalManagementSystem;

CREATE TABLE Patient_Information_Table(
Email_of_Patient varchar(100),
Name_of_Patient varchar(100) NOT NULL,
Password_of_Patient varchar(100) NOT NULL,
Gender_of_Patient VARCHAR(100) NOT NULL,
Address_of_Patient varchar(100) NOT NULL,
PRIMARY KEY(Email_of_Patient)
);

CREATE TABLE Medical_History_of_Patient(
Id_of_Medical_History int,
Date_of_Visit DATE NOT NULL,
Conditions_of_Patient VARCHAR(1000) NOT NULL, 
Surgeries_of_Patient VARCHAR(1000) NOT NULL, 
Medication_of_Patient VARCHAR(1000) NOT NULL,
PRIMARY KEY(Id_of_Medical_History)
);

CREATE TABLE Doctor_Information_Table(
Email_of_Doctor varchar(100),
Name_of_Doctor varchar(100) NOT NULL,
Gender_of_Doctor varchar(100) NOT NULL,
Password_of_Doctor varchar(100) NOT NULL,
PRIMARY KEY(Email_of_Doctor)
);

CREATE TABLE Appointment_Information_Table(
Id_of_Appointment int,
Date_of_Appointment DATE NOT NULL,
Starttime_of_Appointment TIME NOT NULL,
Endtime_of_Appointment TIME NOT NULL,
Status_of_Appointment varchar(100) NOT NULL,
PRIMARY KEY(Id_of_Appointment)
);

CREATE TABLE Patient_Attend_Appointments_Information_Table(
Id_of_Appointment int NOT NULL,
Email_of_Patient varchar(100) NOT NULL,
Concerns_of_Patient varchar(100) NOT NULL,
Symptoms_of_Patient varchar(100) NOT NULL,
PRIMARY KEY (Email_of_Patient, Id_of_Appointment),
FOREIGN KEY (Email_of_Patient) REFERENCES Patient_Information_Table (Email_of_Patient) ON DELETE CASCADE,
FOREIGN KEY (Id_of_Appointment) REFERENCES Appointment_Information_Table (Id_of_Appointment) ON DELETE CASCADE
);

CREATE TABLE Schedule_Information_Table(
Id_of_Schedule int NOT NULL,
Starttime_of_Schedule TIME NOT NULL,
Endtime_of_Schedule TIME NOT NULL,
Breaktime_of_Schedule TIME NOT NULL,
Day_of_Schedule varchar(100) NOT NULL,
PRIMARY KEY (Id_of_Schedule, Starttime_of_Schedule, Endtime_of_Schedule, Breaktime_of_Schedule, Day_of_Schedule)
);

CREATE TABLE Patients_Fill_History_Information_Table(
Email_of_Patient varchar(100) NOT NULL,
Id_of_Medical_History int NOT NULL,
PRIMARY KEY (Id_of_Medical_History),
FOREIGN KEY (Email_of_Patient) REFERENCES Patient_Information_Table(Email_of_Patient) ON DELETE CASCADE,
FOREIGN KEY (Id_of_Medical_History) REFERENCES Medical_History_of_Patient(Id_of_Medical_History) ON DELETE CASCADE
);

CREATE TABLE Diagnose_Information_Table(
Id_of_Appointment int NOT NULL,
Email_of_Doctor varchar(100) NOT NULL,
Diagnosis_of_Patient varchar(100) NOT NULL,
Prescription_To_Patient varchar(100) NOT NULL,
PRIMARY KEY (Id_of_Appointment, Email_of_Doctor),
FOREIGN KEY (Id_of_Appointment) REFERENCES Appointment_Information_Table(Id_of_Appointment) ON DELETE CASCADE,
FOREIGN KEY (Email_of_Doctor) REFERENCES Doctor_Information_Table(Email_of_Doctor) ON DELETE CASCADE
);

CREATE TABLE Doctors_Have_Schedules_Information_Table(
Id_of_Schedule int NOT NULL,
Email_of_Doctor varchar(100) NOT NULL,
PRIMARY KEY (Id_of_Schedule, Email_of_Doctor),
FOREIGN KEY (Id_of_Schedule) REFERENCES Schedule_Information_Table (Id_of_Schedule) ON DELETE CASCADE,
FOREIGN KEY (Email_of_Doctor) REFERENCES Doctor_Information_Table (Email_of_Doctor) ON DELETE CASCADE
);

CREATE TABLE Doctor_Views_History_Information_Table(
Email_of_Doctor varchar(100) NOT NULL,
Id_of_Medical_History int NOT NULL,
PRIMARY KEY (Id_of_Medical_History, Email_of_Doctor),
FOREIGN KEY (Email_of_Doctor) REFERENCES Doctor_Information_Table (Email_of_Doctor) ON DELETE CASCADE,
FOREIGN KEY (Id_of_Medical_History) REFERENCES Medical_History_of_Patient (Id_of_Medical_History) ON DELETE CASCADE
);
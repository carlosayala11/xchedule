create table users (
  uid varchar(30) primary key,
  full_name varchar(100) not null,
  username varchar(40) not null,
  password varchar(40) not null,
  email varchar(30) not null,
  phone_number char(10) not null,
  age integer not null,
  gender char(1),
  uaddress address_item,
  isOwner boolean
);

create table services (
	sid serial not null constraint service_pkey primary key,
	serviceType varchar(30),
	serviceDetails text
);

create table appointments (
	aid serial not null constraint appointments_pkey primary key,
	date date,
	duration integer not null,
	pending boolean,
	completed boolean,
	canceled boolean
);

create table offers(
    bid integer constraint business_bid_fkey references business,
    sid integer constraint services_sid_fkey references services,
    primary key (bid, sid)
 );

create table schedules(
    aid integer constraint appointments_bid_fkey references appointments,
    uid varchar(30) constraint users_uid_fkey references users,
    primary key (aid, uid)
 );

create table requests(
    aid integer constraint appointments_bid_fkey references appointments,
    sid integer constraint services_sid_fkey references services,
    primary key (aid, sid)
 );

create type location_item AS (
    latitude numeric(18,9),
    longitude numeric(18,9),
    mapURL varchar(1024)
);

create type address_item AS (
    address varchar(100),
    country varchar(20),
    city varchar(20),
    zipcode varchar(10)
);

create table business (
	bid serial not null constraint business_pkey primary key,
	uid integer constraint user_uid_fkey references users,
	bname varchar(40) not null,
	twitter varchar(30),
	facebook varchar(30),
	instagram varchar(30),
	website_url varchar(30),
    workingHours varchar(100) not null,
    workingDays varchar(100) not null,
    baddress address_item,
	blocation location_item,
    timeRestriction int
);

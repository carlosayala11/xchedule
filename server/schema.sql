create table users (
  uid serial not null constraint users_pkey primary key,
  full_name varchar(40) not null,
  email varchar(30) not null,
  phone_number char(10) not null,
  age integer not null,
  gender char(1),
  country varchar(20) not null,
  city varchar(20) not null,
  isOwner boolean
);

create table service (
	sid serial not null constraint service_pkey primary key,
	admin_id integer constraint service_admin_id_fkey references users,
	country varchar(20) not null,
	city varchar(20) not null,
	phone_number char(10) not null,
	website_url varchar(30),
	facebook varchar(30),
	instagram varchar(30)
);

create table appointments (
	aid serial not null constraint appointments_pkey primary key,
	sid integer constraint appointments_sid_fkey references service,
	uid integer constraint users_uid_fkey references users,
	adate date not null,
	duration integer not null,
	pending boolean,
	status varchar(10)
);

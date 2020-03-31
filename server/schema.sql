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
	/*admin_id integer constraint service_admin_id_fkey references users,*/
	details text,
	website_url varchar(30),
	facebook varchar(30),
	instagram varchar(30)
	 /*,
	country varchar(20) not null,
	city varchar(20) not null,
	phone_number char(10) not null,
	*/
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

create table owns(
    uid integer constraint users_uid_fkey references users,
    bid integer constraint business_bid_fkey references business,
    primary key (uid, bid)
 );

create table offers(
    bid integer constraint business_bid_fkey references business,
    sid integer constraint service_sid_fkey references service,
    primary key (bid, sid)
 );

create type location_item AS (
    latitude numeric(18,9),
    longitude numeric(18,9),
    URL varchar(1024)
);

create type address_item AS (
    address varchar(100),
    country varchar(20),
    city varchar(20),
    zipcode varchar(10)
);

create table business (
	bid serial not null constraint business_pkey primary key,
	bname varchar(40) not null,
    bphone char(10) not null,
    bemail varchar(30) not null,
    baddress address_item,
	blocation location_item
);

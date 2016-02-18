create table transaction(
	Date date,
	PlatformId int,
	Software varchar(45),
	ParentAccountId varchar(45),
	ParentName varchar(95),
	ChildAccountId varchar(45),
	ChildName varchar(95),
	Merchant_Id varchar(95),
	TxnIdClassId varchar(45),
	TransferLogIdClassId varchar(45),
	Card_Number varchar(45),
	Txn_Amount decimal(48,2)
);
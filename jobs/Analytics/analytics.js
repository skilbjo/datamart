var 
  path = require('path'),
  flag = (process.argv[2] ==='-f') ? true : false,  
  extract         = flag ? require('./../../extract').extract           : require('./../extract').extract,
  transform       = flag ? require('./../../transform').transform       : require('./../transform').transform, 
  load            = flag ? require('./../../load').load                 : require('./../load').load,   
  email           = flag ? require('./../../email').email               : require('./../email').email, 
  // destination_db  = flag ? require('./../../lib/config/localhost_db.js')  : require('./../lib/config/localhost_db.js') ,  
  destination_db  = flag ? require('./../../lib/config/finance_db.js')  : require('./../lib/config/finance_db.js') ,   
  source_db = 'crostoli',  // crostoli or finance
  file = path.basename(__filename.replace(/.js$/,'')),
  dir = __dirname.split(path.sep),
  folder = flag ? dir[dir.length-2] : dir.pop() ,
  subfolder = flag ? subfolder = dir.pop() : null
  ;

var sql = 'insert into analytics ('+
    ' Year, Month, Date, PlatformId, Gateway, Vertical, '+
    ' PaymentType, Network, PaymentTypeGroup, Currency, ' +
    ' TPV, TPV_USD, Txn_Count, Card_Volume, Card_Txn_Count, Card_Volume_USD ' +
    ' ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)';

extract(source_db, file, subfolder, function(data){
  // console.log(data);
	transform(data, function(data){
    // console.log(data);
		load(data, destination_db, sql, function(){
      email(file, function(){
        console.log('Data inserted.');        
      });
		});
	});
});


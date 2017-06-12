module.exports = () =>{
    const config = {
        db_url: 'mongodb://localhost/employees'
    };
    if(process.env.NODE_ENV= "development"){
        config.db_url= 'mongodb://localhost/test'
    }
    return config;
} 
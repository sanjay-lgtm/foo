const config = {
    local:{
        db:{
            host:"127.0.0.1",
            portno:27017,
            dbname:"sanjay",
            
            
        },
     
    }
}
export const get = (env) =>{
    return config [env];
}
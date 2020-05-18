module.exports.fetchWithValues=async function fetchQuery(query,connection,values){
    return new Promise((resolve,reject)=>{
        connection.query(query,values,(error,results,fields)=>{
            if(error){
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
}

module.exports.fetch=async function fetch(query,connection){
    return new Promise((resolve,reject)=>{
        connection.query(query,(error,results,fields)=>{
            if(error){
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
}
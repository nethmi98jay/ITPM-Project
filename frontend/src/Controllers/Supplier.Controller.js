
// import Axios 
import Axios from "axios";

// import config
import Config from "./Config.Controller";

class Supplier {
    constructor() {
        // user related apis
        this.api = {
            addSupplier: "/Supplier/add",
            getAllSupplier: "/Supplier",
            updateSupplier: "/Supplier/update",
            deleteSupplier: "/Supplier/delete",
            getSupplier: "/Supplier/getOne",
            getSupplierByDate:"/Supplier/getBydate",
        };
    }

    addSupplier = async (data) => {
        console.log(data);



        var resp = 600;
        var userData = {}
        await Axios.post(
            `${Config.host}${Config.port}${this.api.addSupplier}`,
            data
        )
            .then(Response => {
                console.log(Response);

                resp = Response.status;
                userData = Response.data.userData
            })
            .catch(err => {
                console.log(err);
                try {
                    console.error(err);
                    resp = err.response.status;
                } catch (error) {
                    console.log(error);
                    resp = 600;
                }
            });

        if (resp === 200) {
            return resp;
        }
        return resp;
    }



    getAllSupplier = () => {
 
        return Axios.get(
            `${Config.host}${Config.port}${this.api.getAllSupplier}`,
        )
        .then(Response => {
            console.log(Response);
            if(Response.status == 200 )
                return Response.data;
            else
                return []
        })
        .catch(err => {
            console.error(err);
            return [];    
        });

    }

    getOne = async (id) => {
        console.log(id);
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getSupplier}/${id}`,)
            // .then(response => {
            //     console.log(response);
            // }).catch(err => {
            //     console.log(err);
            // })
        
            .then(Response => {
                console.log(Response);

                resp = Response.status;
                userData = Response.data
            })
            .catch(err => {
                console.error(err);
                try {
                    console.error(err);
                    resp = err.response.status;
                } catch (error) {
                    console.log(error);
                    resp = 600;
                }
            });

        if (resp === 200) {
            return userData;
        }
        return resp;
    }


    editSupplier = async (data) => {
        console.log(data);



        var resp = 600;
        var userData = {}
        await Axios.post(
            `${Config.host}${Config.port}${this.api.updateSupplier}`,
            data
        )
            .then(Response => {
                console.log(Response);

                resp = Response.status;
                userData = Response.data.userData
            })
            .catch(err => {
                console.error(err);
                try {
                    console.error(err);
                    resp = err.response.status;
                } catch (error) {
                    console.log(error);
                    resp = 600;
                }
            });

        if (resp === 200) {
            return resp;
        }
        return resp;
    }
    getByDate = async (date) => {
        console.log(date);
    
        return Axios.get(
            `${Config.host}${Config.port}${this.api.getSupplierByDate}/${date}`,)
            // .then(response => {
            //     console.log(response);
            // }).catch(err => {
            //     console.log(err);
            // })
        
            // .then(Response => {
            //     console.log(Response);

            //     resp = Response.status;
            //     userData = Response.data
                
            // })
            // .catch(err => {
            //     console.error(err);
            //     try {
            //         console.error(err);
            //         resp = err.response.status;
            //     } catch (error) {
            //         console.log(error);
            //         resp = 600;
            //     }
            // });

        // if (resp === 200) {
        //     return userData;
        // }
        // return resp;
        .then(Response => {
            console.log(Response);
            if(Response.status == 200 )
                return Response.data;
            else
                return []
        })
        .catch(err => {
            console.error(err);
            return [];    
        });
    }

    deleteSupplier = async (data) => {
        console.log(data);



        var resp = 600;
        var userData = {}
        await Axios.delete(
            `${Config.host}${Config.port}${this.api.deleteSupplier}/${data.id}`,
        )
            .then(Response => {
                console.log(Response);

                resp = Response.status;
                userData = Response.data.userData
            })
            .catch(err => {
                console.error(err);
                try {
                    console.error(err);
                    resp = err.response.status;
                } catch (error) {
                    console.log(error);
                    resp = 600;
                }
            });

        if (resp === 200) {
            return resp;
        }
        return resp;
    }
}
var UserObject = new Supplier();
export default UserObject;
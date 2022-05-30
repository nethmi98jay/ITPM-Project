// import Axios 
import Axios from "axios";

// import config
import Config from "./Config.Controller";


class DStock {
    constructor() {
        // user related apis
        this.api = {
            addDStock: "/DStock/add",
            getAllDStock: "/DStock",
            updateDStock: "/DStock/update",
            deleteDStock: "/DStock/delete",
            getDStock: "/DStock/getOne",
        };
    }

    addDStock = async (data) => {
        console.log(data);



        var resp = 600;
        var userData = {}
        await Axios.post(
            `${Config.host}${Config.port}${this.api.addDStock}`,
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



    getAllDStock = () => {
 
        return Axios.get(
            `${Config.host}${Config.port}${this.api.getAllDStock}`,
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
            `${Config.host}${Config.port}${this.api.getDStock}/${id}`,)
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


    editDStock = async (data) => {
        console.log(data);



        var resp = 600;
        var userData = {}
        await Axios.post(
            `${Config.host}${Config.port}${this.api.updateDStock}`,
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

    deleteDStock = async (data) => {
        console.log(data);



        var resp = 600;
        var userData = {}
        await Axios.delete(
            `${Config.host}${Config.port}${this.api.deleteDStock}/${data.id}`,
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
var UserObject = new DStock();
export default UserObject;

// import Axios 
import Axios from "axios";

// import config
import Config from "./Config.Controller";

class Expense {
    constructor() {
        // user related apis
        this.api = {
            addExpense: "/Expense/add",
            getAllExpense: "/Expense",
            updateExpense: "/Expense/update",
            deleteExpense: "/Expense/delete",
            getExpense: "/Expense/getOne",
            getExpenseByDate: "/Expense/getByDate",
        };
    }

    addExpense = async (data) => {
        console.log(data);



        var resp = 600;
        var userData = {}
        await Axios.post(
            `${Config.host}${Config.port}${this.api.addExpense}`,
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



    getAllExpense = () => {
 
        return Axios.get(
            `${Config.host}${Config.port}${this.api.getAllExpense}`,
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
            `${Config.host}${Config.port}${this.api.getExpense}/${id}`,)
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


    editExpense = async (data) => {
        console.log(data);



        var resp = 600;
        var userData = {}
        await Axios.post(
            `${Config.host}${Config.port}${this.api.updateExpense}`,
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
            `${Config.host}${Config.port}${this.api.getExpenseByDate}/${date}`,)
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

    deleteExpense = async (data) => {
        console.log(data);



        var resp = 600;
        var userData = {}
        await Axios.delete(
            `${Config.host}${Config.port}${this.api.deleteExpense}/${data.id}`,
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
var UserObject = new Expense();
export default UserObject;
// import confirm alerts
import { confirmAlert } from "react-confirm-alert";
import { toast } from 'react-toastify';
class Config {
    // constructor() {
    // //backend server details
    //   // this.host = "https://spmtestone.herokuapp.com";
    //   this.host = "http://localhost:4000";
    //   this.port = ":4000";
    //   this.port = "";
    // }
    
      constructor () {
          this.host = "http://127.0.0.1";
          this.port = ":8070"
      }

    // alert show
    async showAlert(_msg, _title) {
      await confirmAlert({
        title: _title || "Alert",
        message: _msg,
        buttons: [
          {
            label: "Ok"
          }
        ]
      });
  
      return 0;
    }
    // alert show
    async showAlert2(_msg, _title) {
      await confirmAlert({
        title: _title || "",
        message: _msg,
        buttons: [
          {
            label: "Ok"
          }
        ]
      });
  
      return 0;
    }

    setImage(url){
      return `${this.host}${this.port}/${url.replace(/\\/g, '/')}`
    }

    setToast(msg){
      toast.info( msg, {
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }

    setErrorToast(msg){
      toast.error( msg, {
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }
    setDeleteConfirmAlert(title , msg , confirm , cancel ){
      confirmAlert({
        title: title,
        message: msg,
        buttons: [
          {
            label: 'Yes',
            onClick: () => confirm()
          },
          {
            label: 'No',
            onClick: () => cancel()
          }
        ]
      });
    }
  
    
  }
  
  var obj = new Config();
  export default obj;
  

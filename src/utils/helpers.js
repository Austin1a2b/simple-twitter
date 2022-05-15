import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'https://intense-journey-94086.herokuapp.com/api'



export const apiHelper = axios.create({ baseURL: baseURL })

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
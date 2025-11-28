import Swal from 'sweetalert2'

export function useSwal() {
  const showAlert = async (options) => {
    return await Swal.fire(options)
  }

  const showSuccess = async (message) => {
    return await showAlert({
      title: 'Success!',
      text: message,
      icon: 'success',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const showError = async (message) => {
    return await showAlert({
      title: 'Error Encounter!',
      text: message,
      icon: 'error',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const showConfirm = async () => {
    return await showAlert({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })
  }

  return { showSuccess, showError, showConfirm }
}


export function success(message: string, time: number = 5000) {
    return {
    // icon: 'success',
    imageUrl: '/assets/gifs/cat-ok.gif',
    title: 'Buen Trabajo!',
    text: message,
    showConfirmButton: false,
    timer: time,
    width: 600,
    padding: '3em',
    background: '#fff',
    backdrop: `
    rgba(0,0,123,0.4)
    url('/assets/gifs/nyan-cat.gif')
    left top
    no-repeat
    `
}
} 

export function confirmAction(message: string) {
    return {
    // icon: 'success',
    imageUrl: '/assets/gifs/repeat-cat.gif',
    title: 'Confirmar accion',
    text: message,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminalo!',
    cancelButtonText: 'no, cancelar',
    width: 600,
    padding: '3em',
    background: '#fff',
    backdrop: `
    rgba(0,0,123,0.4)
    url('/assets/gifs/nyan-cat.gif')
    left top
    no-repeat
    `
}
} 

export function deleted(message: string, time: number = 5000) {
    return {
    // icon: 'success',
    imageUrl: '/assets/gifs/deleted-cat.gif',
    title: 'Hecho! eliminado!',
    text: message,
    showConfirmButton: false,
    timer: time,
    width: 600,
    padding: '3em',
    background: '#fff',
    backdrop: `
    rgba(0,0,123,0.4)
    url('/assets/gifs/nyan-cat.gif')
    left top
    no-repeat
    `
}
} 

export function error(message: string, time: number = 5000) {
    return {
    // icon: 'success',
    imageUrl: '/assets/gifs/cat-error.gif',
    title: 'Oops! Ocurrio un error!',
    text: message,
    showConfirmButton: false,
    timer: time,
    width: 600,
    padding: '3em',
    background: '#fff',
    backdrop: `
    rgba(0,0,123,0.4)
    url('/assets/gifs/nyan-cat.gif')
    left top
    no-repeat
    `
}
}

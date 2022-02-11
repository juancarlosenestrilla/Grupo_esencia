// variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');



  //varaibles
const btnEnviar = document.querySelector('#enviar');
const formularioEnviar = document.querySelector('#enviar-mail');
const resetBtn = document.querySelector('#resetBtn');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// event Listener

eventListeners();

function eventListeners() {
     // Inicio y disparo de la aplicación y deshabilitar submit
     document.addEventListener('DOMContentLoaded', inicioApp);

     // Campos del formulario
     email.addEventListener('blur', validarFormulario);  //blur es para que cuando este en ese boton se ejecute ese campo y se valide luego luego en tiempo real
     asunto.addEventListener('blur', validarFormulario);
     mensaje.addEventListener('blur', validarFormulario);

    

     // Boton de enviar en el submit
     formularioEnviar.addEventListener('submit', enviarEmail);

     // Boton de resetear formulario
     resetBtn.addEventListener('click', resetearFormulario);
}



// funciones
function inicioApp() {
     // deshabilitar el envio
     btnEnviar.disabled = true; //disabled hace que no funcione el boton
     btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')//el btn no envia nada -cursor-not-allowed y tiene opacidad hsta que se validen todos los campos
}


// Valida que el campo tengo algo escrito

function validarFormulario(e) {
     //console.log(e.target.type); //Nos muestra en consola que tipo es (email, text, textarea)
      
     if(e.target.value.length > 0 ) {  //e.target es el input sobre el cual estamos escribiendo
        
        //elimina los errores
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500'); //cambiamos el style del border
        e.target.classList.add('border', 'border-green-500');
     } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');  //clases del framework tailwind.min.cs
        //  e.target.style.borderBottomColor= 'red'; //al salirme de un input se pone de un color rojo el border

        mostrarError('Todos los campos son obligatorios');
     }
       
     if (e.target.type==='email'){
       
          
        if(er.test ( e.target.value)){
              const error = document.querySelector('p.error');
              error.remove();
              
              e.target.classList.remove('border', 'border-red-500'); //cambiamos el style del border
              e.target.classList.add('border', 'border-green-500');
           } else {
              e.target.classList.remove('border', 'border-green-500');
              e.target.classList.add('border', 'border-red-500');  //clases del framework tailwind.min.cs
             
      
              mostrarError('Email no válido');

          }
        }

        if(er.test(email.value) && asunto.value !== '' && mensaje.value !== '' ) {  //email.value hace referencia alos valores que tenemos declarados en la parte superior
           // console.log('Pasaste la validación')
           btnEnviar.disabled = false;  //se habilita el boton enviar
           btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');


        }/*else{
            console.log('Hay campos por validar')
            }*/
}
        
                   //metodo viejo para Validar unicamente el email
          /* if (e.target.type==='email'){
                const resultado = e.target.value.indexOf('@')
                console.log(resultado) //valida que tenga el signo @ ,si no existe da como resultado -1
                if(resultado < 0 ){
                     mostrarError('El email no es válido');
                }
           }*/

     



function mostrarError(mensaje){
     const mensajeError = document.createElement('p'); //crea un elemento
    // mensajeError.textContent = 'Todos los campos son Obligatorios'; //contenido de texto
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'mt-2', 'text-center','error'); //mt es margin-top
     
     const errores = document.querySelectorAll('.error'); //Con este codigo ya no aparecen muchas ventanas multiples de Todos los campos son obligatorios
     if (errores.length === 0){
          formularioEnviar.appendChild(mensajeError);
         // formularioEnviar.insertBefore(mensajeError,document.querySelector('.mb-10')); //esto hace que el recuadro de todos los campos son obligatorios aparesca arriba del para.
     }
     
} 

   



// Resetear el formulario 
function resetFormulario(e) {
     formularioEnviar.reset();
     e.preventDefault();
}

// Cuando se envia el correo
function enviarEmail(e) {

    e.preventDefault();


     // Spinner al presionar Enviar
     const spinner = document.querySelector('#spinner');
     spinner.style.display = 'flex';

     // Gif que envia email
     const enviado = document.createElement('p');
     enviado.textContent = 'Mensaje Enviado Correctamente';
     enviado.classList.add('bg')

     // Ocultar Spinner y mostrar gif de enviado

     // setInterval se ejecuta cada determidado tiempo
     setTimeout( () => {  //setTimeout una sola vez indefinidamente
          spinner.style.display = 'none';

          //despues de 3 segundos ocultar el spiner y mostrar el mensaje
          const parrafo = document.createElement('p');
          parrafo.textContent = 'El mensaje se envio correctamente';
          parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')

          //inserta el parrafo antes del spinner
          formularioEnviar.insertBefore(parrafo, spinner);

         

          setTimeout(() =>  {
               parrafo.remove(); //Elimina el mensaje de exito
               resetearFormulario()
               inicioApp()
          }, 5000);
     }, 3000);
}

//Función que resete el formulario
function resetearFormulario() {
    formularioEnviar.reset();

    inicioApp();
}






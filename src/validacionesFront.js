window.addEventListener('load', function(){

    let formulario= document.querySelector('form-container');



    formulario.addEventListener('submit', function(e){
        e.preventDefault();

        let nombre= document.querySelector('#firt_name');
        if(nombre.value== ""){
            alert("El nombre no puede estar incompleto")
        }
        else if(nombre.value.length>2){
            alert("El nombre debe tener más de 2 caracteres")
        }
        let apellido= document.querySelector('#last_name');
        if(apellido.value== ""){
            alert("El apellido no puede estar incompleto")
        }
        else if(apellido.value.length>2){
            alert("El apellido debe tener más de 2 caracteres")
        }
    })



    
    
});

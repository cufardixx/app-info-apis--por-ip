const OPTIONS = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '652acb2006mshd26f8704599ab43p189b3fjsndf1ab1bbfd2a',
      'X-RapidAPI-Host': 'ip-geolocation-and-threat-detection.p.rapidapi.com'
    }
  };

  const fetchIpInfo = ip =>{
    return fetch( `https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`, OPTIONS)
    .then(res => res.json())
    .catch(err => console.error(err))
  }


  //crear los elementos del html (recuperarlos) el $ es para diferenciar q es un elemento del DOM

  const $form = document.querySelector('#form')
  const $input = document.querySelector('#input')
  const $resuelts = document.querySelector('#resuelts')
  
  //crear un logo de loading para mejorar experiencia al usuario con el boton sumbit
  const $submit = document.querySelector('#submit')
  
  $form.addEventListener('submit', async (e)=>{
    //el preventDefault que se le hace al evento(e) es para q no se referesque la pagina por el sumbit
    e.preventDefault()
    //recuperamos el valor q tenemos dentro del input
    const {value} = $input
    if(!value) return //si no temos valor retorna  y no hace nada

    //aca se hace el loading anes de q pida la info primero desactivamos el atributo
    $submit.setAttribute('disable', '')
    $submit.setAttribute('aria-busy', 'true') //activado 
    

    // ahora si tiene valor va a buscar la informacion recuperando el ipInfo y como es una funcion asincrona vamos a tener que hacer un await
    const ipInfo = await fetchIpInfo(value)
    // en este punto ya tenemos toda la informacion de l IP ahora toca mostrarla Formateandola

    if(ipInfo){
        $resuelts.innerHTML = JSON.stringify(ipInfo, null, 2)
    }

    $submit.removeAttribute('disable')
    $submit.removeAttribute('aria-busy', 'true') //quitamos el atributo despues de la funcion busqueda
})

  
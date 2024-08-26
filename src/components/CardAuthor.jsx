import React from 'react'

const CutString=(chaine)=>{
    return chaine.substring(0,100)+"..."
}
function CardAuthor() {
  return (
    <div className='card'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWpxhXH7gBHtHTXPDuMuanPlZCvwhFeouCre_0PH-qUHPEqIjs" alt="paulo coelho" className='card__img'/>
        <h1 className='card__title'>Paulo Coelho</h1>
        <p className='card__text'>
            {CutString('Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores vel qui expedita excepturi necessitatibus architecto provident illo aliquam accusantium, molestiae sit natus quibusdam ex molestias numquam doloremque. Quae, consequatur quisquam?         Voluptatem, aspernatur. Doloremque quae illo itaque explicabo cumque, eum excepturi. Consectetur molestiae accusamus, rem libero illo nostrum vitae tempore veniam quia ea accusantium porro consequatur ipsa nemo eos. Id, labore.')}
</p>
        <button className='card__btn'>Voir plus</button>
    </div>
  )
}

export default CardAuthor

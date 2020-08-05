import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars1.githubusercontent.com/u/60656778?s=460&u=d093ef8b56bdd7eba13064d3538c9fc844014d52&v=4" alt="Bernardo Rodrigues"/>
        <div>
          <strong>Bernardo Rodrigues</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        <br/><br/>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam tempora tenetur 
        neque commodi eum quia cupiditate, consequuntur facilis in, minima quas ea explicabo 
        corporis facere laborum libero sit quidem assumenda.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$80,00</strong>
        </p>

        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem;

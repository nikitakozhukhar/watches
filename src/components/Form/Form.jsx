import './form.css'
import { useState } from 'react';


export function Form({addWatch}) {
  const formEmptyValue = { title: '', timezone: '' };
  const [form, setForm] = useState({title: '', timezone: ''})
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.title.length === 0 || form.timezone.length === 0) return;

    const timezone = parseInt(form.timezone, 10);
    if (isNaN(timezone) || timezone < -12 || timezone > 14) {
      alert('Введите корректную временную зону от -12 до +14.');
      return;
    }

    addWatch({ ...form, timezone }); 
    
    setForm(formEmptyValue);
  }

  const handleChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target
    setForm(prevForm => ({...prevForm, [name]: value}))
  }
  
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__container">
        <div className="form__input-title">
          <label htmlFor="title">Название</label>
          <input 
            className="input__title"
            name={'title'}
            value={form.title}
            onChange={handleChange}
            placeholder="Название города">
          </input>
        </div>

        <div className="form__input-timezone">
          <label htmlFor="timezone"> Временная зона</label>
          <input 
            type="number"
            className="input__timezone"
            name={'timezone'}
            value={form.timezone}
            onChange={handleChange}
            placeholder="Пример ввода 1, -2">
           </input>
        </div>

        
        <button type="submit" className="form__btn">
          Добавить
        </button>
      </div>
    </form>
  );
}

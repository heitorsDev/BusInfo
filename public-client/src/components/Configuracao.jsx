import '../style/Header.css';
import '../style/MenuOption.css';
import '../style/Logo.css';
import '../style/Configuracao.css'
import '../style/MenuOption2.css'
import '../style/ConfigOption.css'
import tomaImg from '../assets/toma.png';
import logo from '../assets/logo.png';
import '../style/Switch.css';
import { useEffect, useState } from 'react';

function Header() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'light' || saved === 'dark') {
            setTheme(saved);
            applyTheme(saved);
            return;
        }
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = prefersDark ? 'dark' : 'light';
        setTheme(initial);
        applyTheme(initial);
    }, []);

    const applyTheme = (t) => {
        const root = document.documentElement;
        root.classList.remove('theme-light', 'theme-dark');
        root.classList.add(t === 'dark' ? 'theme-dark' : 'theme-light');
    };

    const handleToggle = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        applyTheme(next);
        localStorage.setItem('theme', next);
    };

    return (
        <>
        <div className="quadrado" style={{width: '18vw', height: '22vh', marginLeft: '10vw', backgroundColor: 'rgba(255, 255, 255, 1)', boxShadow: '0px 4px 0px 0px rgba(193, 193, 193, 1)'}}>
        <h2 className="NoticiaTitle" style={{marginLeft: '2vw', color: 'rgb(255, 115, 0)'}}>Modo Escuro</h2>
        <label
        style={{borderRadius: '10px', marginLeft: '2vw' }}
        className="switch">
            <input type="checkbox" checked={theme === 'dark'} onChange={handleToggle} />
            <span className="slider round"></span>
        </label>
        
        </div>
        </>
    );
}

export default Header;
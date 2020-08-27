import React from 'react';
import { Link } from 'react-router-dom';

import LogoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps {
    // se fosse "title?: string", significaria que não
    // é um valor obrigatório de se receber;
    title: string;
    description?: string;
    section: string;
}

// "FunctionComponent" pode ser abreviado para "FC"
const PageHeader: React.FunctionComponent<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>
                <span>{props.section}</span>
                <img src={LogoImg} alt="Proffy"/>
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                {/* a segunda parte do codigo só é executada se a */}
                {/* primeira for verdadeira */}
                { props.description && <p> {props.description} </p> }

                {props.children}
            </div>
        </header>
    )
}

export default PageHeader;
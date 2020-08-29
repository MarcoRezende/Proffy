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
    extra?: {
        text: Array<string>;
        img: string;
    }
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
                <div className="header-inner">
                    <div>
                        <strong>{props.title}</strong>
                        {/* a segunda parte do codigo só é executada se a */}
                        {/* primeira for verdadeira */}
                        { props.description && <p> {props.description} </p> }
                    </div>
                    { props.extra &&
                        <div style={props.description ? {alignSelf:"flex-end"} : {alignSelf: "initial"}}>
                            <img src={props.extra.img} alt=""/>
                            <div className="header-message">
                                {props.extra.text.map(message => {
                                    return <p key={message}>{message}</p>
                                })}
                            </div>
                        </div>
                    }
                </div>

                {props.children}
            </div>
        </header>
    )
}

export default PageHeader;
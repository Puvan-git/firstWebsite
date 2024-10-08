import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import headerImg from "../assets/img/header-img.svg";

export const Banner = () => {
    const toRotate = ["Web Developer", "Frontend Developer", "Data Analyst"];
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');

    const [delta, setDelta] = useState(300 - Math.random() * 10);
    const period = 2000; // dictates how much time passes by the time one letter types out

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta)

        return () => { clearInterval(ticker) }; // eslint-disable-next-line
    }, [text, delta])


    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
            console.log('deleting text');
        }

        if (!isDeleting && updatedText === fullText) {
            console.log('full text out');
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            console.log('fully deleted, blank now');
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <span className="tagline">Welcome to my Portfolio</span>
                        <h1>{"Hi i'm Puvan, a"}<br></br><span className="wrap">{text}</span></h1>
                        <p>Developer by Day, Still Developer by Night. <br></br> From Concept to Creation
                            &mdash; that's the Code I live by.</p>
                        <button onClick={() => console.log('connect')}>
                            Contact Me
                            <ArrowRightCircle size={20}>
                            </ArrowRightCircle>
                        </button>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="Header Img" />
                    </Col>
                </Row>
            </Container>
        </section >
    )
}
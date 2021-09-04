import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Swal from "sweetalert2";

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0 3px 8px 0 rgba(206, 147, 216, 0.08);
  background: linear-gradient(
      rgba(225, 190, 231, 0.28) 0%,
      rgba(74, 20, 140, 0.7) 100%
    ),
    url(${(props) => props.bgPhoto});
  background-position: center center;
  background-size: cover;
  padding: 0px 25px;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 10px;
`;

const Tag = styled.div`
  background-color: ${(props) => props.bgColor};
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 3px;
  width: 60px;
  border-radius: 3px;
  text-align: center;
  color: ${(props) => props.color};
  margin-bottom: 10px;
`;

const TagName = styled.span``;

const Title = styled.span`
  font-weight: 900;
  color: ${(props) => props.color};
  font-size: 28px;
  text-align: center;
  line-height: 1;
  margin-bottom: 5px;
`;

const Subtitle = styled.span`
  text-align: center;
  font-size: 25px;
  color: #ffe082;
  font-weight: 900;
  margin-bottom: 30px;
`;

const CTA = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: ${(props) => props.bgColor};
  padding: 10px 0px;
  text-align: center;
  cursor: pointer;
  color: ${(props) => props.color};
`;

const CTAText = styled.span`
  font-weight: 500;
`;

const Card05 = ({
  bgPhoto,
  tag,
  tagColor = "white",
  tagBg,
  title,
  titleColor = "white",
  subtitle,
  ticketId,
  eventId,
  cta,
  ctaColor = "white",
  ctaBg = "#006EFE",
  commision,
  payType,
  qty,
}) => (
  <Container bgPhoto={bgPhoto}>
    <Content>
      {tag && (
        <Tag bgColor={tagBg} color={tagColor}>
          <TagName>{tag}</TagName>
        </Tag>
      )}
      {(title || subtitle) && (
        <>
          {title && <Title color={titleColor}>{title}</Title>}
          {subtitle !== 0 && <Subtitle>{subtitle} $</Subtitle>}
        </>
      )}

      {qty && (
        <>
          <Tag bgColor={"#673AB7"} color={"#EDE7F6"}>
            <TagName style={{ fontSize: "20px" }}>{qty} </TagName>
          </Tag>{" "}
          <p style={{ color: "white", marginTop: "-5px" }}>Tickets left</p>
        </>
      )}

      {!qty && (
        <Tag bgColor={"#B71C1C"} color={"#EDE7F6"}>
          <TagName>Sold Out</TagName>
        </Tag>
      )}
    </Content>
    {cta && (
      <CTA
        onClick={() => {
          const uid = localStorage.getItem("id");
          if (uid) {
            window.location =
              "http://localhost:3001/booking/" + ticketId + "/" + eventId;
          } else {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Please login to Book a ticket!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }}
        bgColor={tagBg}
        color={ctaColor}
      >
        <CTAText>{cta}</CTAText>
      </CTA>
    )}
  </Container>
);

Card05.propTypes = {
  bgPhoto: PropTypes.string,
  tag: PropTypes.string,
  eventId: PropTypes.string,
  tagColor: PropTypes.string,
  tagBg: PropTypes.string,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  ticketId: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleColor: PropTypes.string,
  cta: PropTypes.string,
  ctaColor: PropTypes.string,
  ctaBg: PropTypes.string,
  commision: PropTypes.string,
  payType: PropTypes.string,
};

export default Card05;

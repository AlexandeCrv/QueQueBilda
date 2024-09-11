import React from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { Link } from "react-router-dom";
import moldura from "../assets/moldura.png";
import emblema1 from "../assets/emblema1.png";
import emblema2 from "../assets/emblema2.png";
import emblema3 from "../assets/emblema3.png";

const AsideComponent = ({ datas, getProfileIconPath }) => {
  return (
    <aside className="bg-bandeira w-48 h-5/6 absolute left-10 z-10">
      <div className="seta-voltar">
        <Link to="/QueQueBilda">
          <button className="botao-procura">
            <VscArrowLeft
              style={{
                width: "25px",
                height: "25px",
                margin: "auto",
                color: "white",
              }}
            />
          </button>
        </Link>
      </div>
      <div className="text-white text-center">
        {datas && datas.summoner ? (
          <div>
            <h2 className="text-2xl">{datas.nameTag.gameName}</h2>
            <p className="text-white absolute z-30 text-sm right-20 mr-1.5 mt-6 top-52">
              {datas.summoner.summonerLevel}
            </p>
            <img
              className="w-48 absolute z-10"
              src={moldura}
              loading="lazy"
              alt="Moldura"
            />
            {datas.summoner.profileIconId && (
              <img
                className="w-28 absolute  left-10"
                style={{ borderRadius: "50%", top: "123px" }}
                src={getProfileIconPath(datas.summoner.profileIconId)}
                alt="Profile Icon"
              />
            )}
            <div className="flex justify-around mt-64">
              <figure>
                <img className="w-12" src={emblema1} alt="" />
              </figure>
              <figure>
                <img className="w-12" src={emblema2} alt="" />
              </figure>
              <figure>
                <img className="w-12" src={emblema3} alt="" />
              </figure>
            </div>
          </div>
        ) : (
          <p className="loading-spinner"></p>
        )}
      </div>
    </aside>
  );
};

export default AsideComponent;

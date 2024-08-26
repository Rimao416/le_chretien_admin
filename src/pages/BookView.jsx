import { useEffect, useState } from "react";
import Location from "../components/Location";
import MainLayout from "../layouts/MainLayout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import CardDashboard from "../components/CardDashboard";
import DataTable from "react-data-table-component";
import { circleData } from "../utils/faker";
import { MdEdit } from "react-icons/md";
import BookModal from "../components/modal/BookModal";
import { assetsURL } from "../config";
import PdfViewer from "../components/PdfViewer";
const BookEdit = ({ onClick, children }) => {
  return (
    <div className="bookEdit">
      <p className="bookEdit__Icon" onClick={onClick}>
        <MdEdit />
      </p>
      {children}
    </div>
  );
};
function BookView() {
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
  ];
  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  const [book, setBook] = useState(undefined);
  const [modal, setModal] = useState(false);
  const { books, loading } = useSelector((state) => state?.bookReducer);
  const [isUpload, setIsUpload] = useState(false);
  const { id } = useParams();
  const [type, setType] = useState("");

  useEffect(() => {
    if (books) {
      books.find((item) => {
        if (item._id === id) {
          setBook(item);
            console.log(item);
        }
      });
    } else {
      console.log("Pas mal");
    }
  }, [id, books]);

  // APEXCHARTS SERIES
  const [chartState, setChartState] = useState({
    series: [
      {
        name: "Income",
        type: "column",
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 9],
      },
      // {
      //   name: 'Cashflow',
      //   type: 'column',
      //   data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
      // },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      plotOptions: {
        bar: {
          barWidth: "10%",
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [2],
      },

      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      },

      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#008FFB",
          },
          labels: {
            style: {
              colors: "#008FFB",
            },
          },

          tooltip: {
            enabled: true,
          },
        },
      ],
    },
  });

  return (
    <MainLayout
      title="Livre"
      subtitle={<Location category={"Livre"} active={book?.title} />}
    >
      <div className="book">
        <div className="book__body">
          <div className="book__body--wrapper">
            <BookEdit onClick={() => setIsUpload(true)}>
              <div
                className={`book__upload ${
                  isUpload ? "book__upload--active" : ""
                }`}
              >
                <div className="book__upload--wrapper">
                  <button
                    className="btn btn--primary"
                    onClick={() => {
                      setType("Cover");
                      setModal(true);
                    }}
                  >
                    Changer la couverture
                  </button>
                  <button
                    className="btn btn--primary"
                    onClick={() => {
                      setType("Content");
                      setModal(true);
                    }}
                  >
                    Changer le document PDF
                  </button>
                  <button
                    className="btn btn--danger"
                    onClick={() => setIsUpload(false)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
              <img
               src={`${assetsURL}/img/${book?.cover}`}
                alt=""
              />
            </BookEdit>
          </div>

          <div className="book__body--wrapper">
            <CardDashboard title="Informations" />

            <div className="book__box">
              <BookEdit
                onClick={() => {
                  setType("Generale");
                  setModal(true);
                }}
              >
                <div className="book__information">
                  <h1 className="book__information--title">
                    INFORMATIONS GENERALES
                  </h1>
                  <div className="book__information--container">
                    <div className="book__information--wrapper">
                      <h1>Titre : </h1>
                      <h1>Auteur : </h1>
                      <h1>Categorie(s) :</h1>
                      <h1>Nombre des pages :</h1>
                      <h1>Evaluation :</h1>
                      <h1>Type :</h1>
                      <a href="#">Voir le livre</a>
                    </div>
                    <div className="book__information--wrapper">
                      <h1>{book?.title}</h1>
                      <h1>{book?.author.fullName}</h1>
                      <h1>{book?.categories.map((item) => item.name + " ")}</h1>
                      <h1>{book?.pages}</h1>
                      <h1>{5 + " étoiles"}</h1>
                      <h1>{book?.isPremium ? "Premium" : "Gratuit"}</h1>
                    </div>
                  </div>
                </div>
              </BookEdit>
            </div>
          </div>
        </div>
        <div className="book__charts">
          <div className="book__charts--header">
            <h1 className="book__charts--title">
              <h1
                style={{
                  textTransform: "uppercase",
                  fontWeight: 700,
                  fontSize: "2rem",
                }}
              >
                DONnées détaills du livre
              </h1>
            </h1>
            <h1 className="book__charts--title">CHARTS</h1>
          </div>
          <div className="book__charts--body">
            <div className="book__charts--wrapper">
              <ReactApexChart
                options={chartState.options}
                series={chartState.series}
                type="line"
                height={300}
              />
            </div>
            <div className="book__charts--wrapper">
              <ReactApexChart
                options={circleData.options}
                series={circleData.series}
                type="bar"
                height={300}
              />
            </div>
          </div>
        </div>
        <div className="book__visualisation">
          <h1>Salut à touss</h1>

          <PdfViewer pdf={book?.content} />
        </div>
        <div className="book__description">
          <BookEdit
            onClick={() => {
              setType("Description");
              setModal(true);
            }}
          >
            <h1 className="book__information--title">DESCRIPTION</h1>
            <p>{book?.description}</p>
          </BookEdit>
        </div>

        <div className="book__advices">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
      {modal && (
        <BookModal
          onClose={() => setModal(false)}
          modal={modal}
          data={book}
          setData={setBook}
          type={type}
        />
      )}
    </MainLayout>
  );
}

export default BookView;

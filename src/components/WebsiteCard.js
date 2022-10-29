import { deleteWebsite } from "../firebase/api";
import { Rate } from 'antd';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'antd';
import _startCase from 'lodash/startCase'
import _lowerCase from 'lodash/lowerCase'
import _toNumber from 'lodash/toNumber'

const { Meta } = Card;
export function WebsiteCard({ link }) {
  const navigate = useNavigate();

  const onDeleteLink = async (id) => {
    if (window.confirm("are you sure you want to delete this link?")) {
      await deleteWebsite(id);
      toast("Link Removed Successfully", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  return (
    <Card
      hoverable
      style={{ width: 240, padding: 10 }}
      cover={<img alt="example" src={link.thumbnail} />}
      onClick={() => navigate(`/edit/${link.id}`)}
    >
      <Meta title={_startCase(_lowerCase(link.name))} description="NA" />
      <p>Genre : {link.genre}</p>
      <Rate defaultValue={_toNumber(link.rating)} />
      <div style={{ display: 'flex', justifyContent: 'space-between', }}>

        <Button type="primary" onClick={() => window.open(link.url, "_blank")} danger ghost>
          Play Music
        </Button>
        <Button type="primary"

          style={{ marginLeft: '1rem' }}
          onClick={(e) => {
            e.stopPropagation();
            onDeleteLink(link.id);
          }} danger>
          Delete
        </Button>

      </div>

    </Card >
  );
}



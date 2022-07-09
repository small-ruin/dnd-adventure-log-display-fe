import { Link } from "react-router-dom";
import { Adventure } from "../../interface";
import { Urls } from "../../request";

interface Props {
    adventure: Adventure
}
export function AdventureListItem({ adventure: adv}: Props) {
    return <div className="adventure-item">
        <Link className="adventure-link" to={ Urls.getAdventureUrl(adv.id) } key={adv.id}>
            { adv.name }
        </Link>
        {<div className="adventure-description">{ adv.announcement }</div>}
    </div>
}
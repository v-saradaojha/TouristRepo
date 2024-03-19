import { Link } from "react-router-dom";
import { Button, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder>
            <header icon>
                <Icon name='search' /> 
                Oops - We've looked everywhere but could not find what you are looking for!
            </header>
            <Segment.Inline>
                <Button as={Link} to='/activities'>
                    Return to activities page
                </Button>
            </Segment.Inline>
        </Segment>
    );
}
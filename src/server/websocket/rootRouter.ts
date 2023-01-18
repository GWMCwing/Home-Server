import { WebSocketRouter } from './handler/webSocketRouter';

export function setupWebSocketRouter() {
    // this is for testing only, will be remodified for an actual websocket router when needed
    return new WebSocketRouter('/')
        .addRouter(
            new WebSocketRouter('/dir1').on('connection', (socket, request) => {
                socket.send('hello from dir1');
            })
        )
        .addRouter(
            new WebSocketRouter('/dir2').addRouter(
                new WebSocketRouter('/dir21').on(
                    'connection',
                    (socket, request) => {
                        socket.send('hello from dir21');
                    }
                )
            )
        )
        .addRouter(
            new WebSocketRouter('/dir3')
                .addRouter(new WebSocketRouter('/dir31'))
                .addRouter(
                    new WebSocketRouter('/dir32').addRouter(
                        new WebSocketRouter('/dir321').on(
                            'connection',
                            (socket, request) => {
                                socket.send('hello from dir321');
                            }
                        )
                    )
                )
        );
}

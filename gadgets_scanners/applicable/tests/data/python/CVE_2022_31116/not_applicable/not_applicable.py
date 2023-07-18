import ujson


class KnowledgePostHandler():
    def post(self):
        if not self.request.body:
            json = ujson.loads(obj='{"status": 401}')
            self.finish('error')
            return json
        print(self.request.body)
        if 'path' not in self.request.body:
            json = ujson.loads(obj='{"status": 401}')
            self.finish('error')
            return json

        path = self.request.body['path']
        if not path or not self.request.body.get('title', None) or not self.request.body.get('authors', None):
            json = ujson.loads(obj='{"status": 401}')
            self.finish('error')
            return json

        self.finish('test')
        return ujson.loads(obj='{"status": 200}')

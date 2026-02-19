from rest_framework.reverse import reverse


class SafeExtraActionViewSetMixin:
    def get_extra_action_url_map(self):

        action_urls = {}
        for action in self.get_extra_actions():
            try:
                url = reverse(
                    f"{self.basename}-{action.__name__}",
                    kwargs={
                        self.lookup_field: getattr(
                            self.get_object(), self.lookup_field
                        )
                    },
                    request=self.request,
                )
                action_urls[action.__name__] = url
            except Exception:
                continue
        return action_urls

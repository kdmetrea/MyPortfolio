from .services import ModelUser
from ..models import AdditionToUser
from .base_services import *


def get_queryset_for_json_list(self):
    pk = self.kwargs.get('pk')
    if not pk:
        return all_objects(ModelUser)
    return filter_objects(ModelUser,pk = pk)
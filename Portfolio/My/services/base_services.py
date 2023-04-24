def all_objects(object):
    return object.all()
def filter_objects(object,**kwargs):
    return object.filter(**kwargs)
def create_object(object,**kwargs):
    return object.create(**kwargs)
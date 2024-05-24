from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.shortcuts import get_object_or_404
from useraccount.serializers import UserDetailSerializer
from useraccount.models import User


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def host_detail(request, pk):
    print("PK ======================>", pk)
    user = get_object_or_404(User, pk=pk)
    print("User Avatar URL ======================>", user.avatar_url)
    # print("User  Name ======================>", user.name)
    serializer = UserDetailSerializer(user, many=False)

    return JsonResponse(serializer.data,  status=200)
